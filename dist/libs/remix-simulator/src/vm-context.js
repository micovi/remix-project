/* global ethereum */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.VMContext = void 0;
const tslib_1 = require("tslib");
const web3_1 = (0, tslib_1.__importDefault)(require("web3"));
const ethereumjs_util_1 = require("ethereumjs-util");
const remix_lib_1 = require("@remix-project/remix-lib");
const { LogsManager } = remix_lib_1.execution;
const VmProxy_1 = require("./VmProxy");
const vm_1 = (0, tslib_1.__importDefault)(require("@ethereumjs/vm"));
const common_1 = (0, tslib_1.__importDefault)(require("@ethereumjs/common"));
const stateManager_1 = (0, tslib_1.__importDefault)(require("@ethereumjs/vm/dist/state/stateManager"));
/*
  extend vm state manager and instanciate VM
*/
class StateManagerCommonStorageDump extends stateManager_1.default {
    constructor() {
        super();
        this.keyHashes = {};
    }
    putContractStorage(address, key, value) {
        this.keyHashes[(0, ethereumjs_util_1.keccak)(key).toString('hex')] = (0, ethereumjs_util_1.bufferToHex)(key);
        return super.putContractStorage(address, key, value);
    }
    dumpStorage(address) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._getStorageTrie(address)
                    .then((trie) => {
                    const storage = {};
                    const stream = trie.createReadStream();
                    stream.on('data', (val) => {
                        const value = ethereumjs_util_1.rlp.decode(val.value);
                        storage['0x' + val.key.toString('hex')] = {
                            key: this.keyHashes[val.key.toString('hex')],
                            value: '0x' + value.toString('hex')
                        };
                    });
                    stream.on('end', () => {
                        resolve(storage);
                    });
                })
                    .catch((e) => {
                    reject(e);
                });
            });
        });
    }
    getStateRoot(force = false) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this._cache.flush();
            const stateRoot = this._trie.root;
            return stateRoot;
        });
    }
    setStateRoot(stateRoot) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this._checkpointCount !== 0) {
                throw new Error('Cannot set state root with uncommitted checkpoints');
            }
            yield this._cache.flush();
            if (!stateRoot.equals(this._trie.EMPTY_TRIE_ROOT)) {
                const hasRoot = yield this._trie.checkRoot(stateRoot);
                if (!hasRoot) {
                    throw new Error('State trie does not contain state root');
                }
            }
            this._trie.root = stateRoot;
            this._cache.clear();
            this._storageTries = {};
        });
    }
}
/*
  trigger contextChanged, web3EndpointChanged
*/
class VMContext {
    constructor(fork) {
        this.blockGasLimitDefault = 4300000;
        this.blockGasLimit = this.blockGasLimitDefault;
        this.currentFork = fork || 'london';
        this.currentVm = this.createVm(this.currentFork);
        this.blocks = {};
        this.latestBlockNumber = "0x0";
        this.blockByTxHash = {};
        this.txByHash = {};
        this.exeResults = {};
        this.logsManager = new LogsManager();
    }
    createVm(hardfork) {
        const stateManager = new StateManagerCommonStorageDump();
        const common = new common_1.default({ chain: 'mainnet', hardfork });
        const vm = new vm_1.default({
            common,
            activatePrecompiles: true,
            stateManager,
            allowUnlimitedContractSize: true
        });
        // VmProxy and VMContext are very intricated.
        // VmProxy is used to track the EVM execution (to listen on opcode execution, in order for instance to generate the VM trace)
        const web3vm = new VmProxy_1.VmProxy(this);
        web3vm.setVM(vm);
        return { vm, web3vm, stateManager, common };
    }
    getCurrentFork() {
        return this.currentFork;
    }
    web3() {
        return this.currentVm.web3vm;
    }
    blankWeb3() {
        return new web3_1.default();
    }
    vm() {
        return this.currentVm.vm;
    }
    vmObject() {
        return this.currentVm;
    }
    addBlock(block) {
        let blockNumber = '0x' + block.header.number.toString('hex');
        if (blockNumber === '0x') {
            blockNumber = '0x0';
        }
        this.blocks['0x' + block.hash().toString('hex')] = block;
        this.blocks[blockNumber] = block;
        this.latestBlockNumber = blockNumber;
        this.logsManager.checkBlock(blockNumber, block, this.web3());
    }
    trackTx(txHash, block, tx) {
        this.blockByTxHash[txHash] = block;
        this.txByHash[txHash] = tx;
    }
    trackExecResult(tx, execReult) {
        this.exeResults[tx] = execReult;
    }
}
exports.VMContext = VMContext;
//# sourceMappingURL=vm-context.js.map