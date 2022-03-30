/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DAO, DAOInterface } from "../../contracts/DAO";

const _abi = [
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "UnequalArrayLengths",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
    ],
    name: "Executed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "accessControl",
    outputs: [
      {
        internalType: "contract IAccessControl",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "calldatas",
        type: "bytes[]",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_accessControl",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5060805161144a61004c6000396000818161026a015281816102b301528181610352015281816103920152610425015261144a6000f3fe60806040526004361061007b5760003560e01c80634f1ef2861161004e5780634f1ef2861461013157806352d1902d14610144578063a516a5bf14610167578063f399e22e1461018757600080fd5b806301ffc9a71461008057806306fdde03146100b557806313007d55146100d75780633659cfe61461010f575b600080fd5b34801561008c57600080fd5b506100a061009b366004610d42565b6101a7565b60405190151581526020015b60405180910390f35b3480156100c157600080fd5b506100ca6101d2565b6040516100ac9190610d98565b3480156100e357600080fd5b506065546100f7906001600160a01b031681565b6040516001600160a01b0390911681526020016100ac565b34801561011b57600080fd5b5061012f61012a366004610de7565b610260565b005b61012f61013f366004610e18565b610348565b34801561015057600080fd5b50610159610418565b6040519081526020016100ac565b34801561017357600080fd5b5061012f610182366004610f26565b6104cb565b34801561019357600080fd5b5061012f6101a2366004610fc0565b6106e9565b60006001600160e01b031982166328394cc960e11b14806101cc57506101cc826107bb565b92915050565b606680546101df90611043565b80601f016020809104026020016040519081016040528092919081815260200182805461020b90611043565b80156102585780601f1061022d57610100808354040283529160200191610258565b820191906000526020600020905b81548152906001019060200180831161023b57829003601f168201915b505050505081565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036102b15760405162461bcd60e51b81526004016102a89061107d565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166102fa6000805160206113ce833981519152546001600160a01b031690565b6001600160a01b0316146103205760405162461bcd60e51b81526004016102a8906110c9565b610329816107f0565b6040805160008082526020820190925261034591839190610891565b50565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036103905760405162461bcd60e51b81526004016102a89061107d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166103d96000805160206113ce833981519152546001600160a01b031690565b6001600160a01b0316146103ff5760405162461bcd60e51b81526004016102a8906110c9565b610408826107f0565b61041482826001610891565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104b85760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016102a8565b506000805160206113ce83398151915290565b6065546040516001623b410b60e21b031981526001600160a01b039091169063ff12fbd49061050e90339030906001600160e01b03196000351690600401611115565b602060405180830381865afa15801561052b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054f9190611142565b61056c5760405163ea8e4eb560e01b815260040160405180910390fd5b848314158061057b5750848114155b15610599576040516311e86f7360e01b815260040160405180910390fd5b60006040518060600160405280602281526020016113ac6022913990508560005b8181101561069d576000808a8a848181106105d7576105d7611164565b90506020020160208101906105ec9190610de7565b6001600160a01b031689898581811061060757610607611164565b9050602002013588888681811061062057610620611164565b9050602002810190610632919061117a565b6040516106409291906111c1565b60006040518083038185875af1925050503d806000811461067d576040519150601f19603f3d011682016040523d82523d6000602084013e610682565b606091505b5091509150610692828287610a01565b5050506001016105ba565b507f56bfe74cbe37ff0615c4d027adf14b7793c59322d51411a0f5a26eb77abac0958888888888886040516106d79695949392919061128b565b60405180910390a15050505050505050565b600054610100900460ff166107045760005460ff1615610708565b303b155b61076b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016102a8565b600054610100900460ff1615801561078d576000805461ffff19166101011790555b61079684610a41565b6107a260668484610ca9565b5080156107b5576000805461ff00191690555b50505050565b60006001600160e01b031982166313007d5560e01b14806101cc57506301ffc9a760e01b6001600160e01b03198316146101cc565b6065546040516001623b410b60e21b031981526001600160a01b039091169063ff12fbd49061083390339030906001600160e01b03196000351690600401611115565b602060405180830381865afa158015610850573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108749190611142565b6103455760405163ea8e4eb560e01b815260040160405180910390fd5b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156108c9576108c483610a8b565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610923575060408051601f3d908101601f191682019092526109209181019061132b565b60015b6109865760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016102a8565b6000805160206113ce83398151915281146109f55760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016102a8565b506108c4838383610b27565b60608315610a10575081610a3a565b825115610a205782518084602001fd5b8160405162461bcd60e51b81526004016102a89190610d98565b9392505050565b600054610100900460ff16610a685760405162461bcd60e51b81526004016102a890611344565b606580546001600160a01b0319166001600160a01b038316179055610345610b4c565b6001600160a01b0381163b610af85760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016102a8565b6000805160206113ce83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b610b3083610b75565b600082511180610b3d5750805b156108c4576107b58383610bb5565b600054610100900460ff16610b735760405162461bcd60e51b81526004016102a890611344565b565b610b7e81610a8b565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b610c1d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016102a8565b600080846001600160a01b031684604051610c38919061138f565b600060405180830381855af49150503d8060008114610c73576040519150601f19603f3d011682016040523d82523d6000602084013e610c78565b606091505b5091509150610ca082826040518060600160405280602781526020016113ee60279139610a01565b95945050505050565b828054610cb590611043565b90600052602060002090601f016020900481019282610cd75760008555610d1d565b82601f10610cf05782800160ff19823516178555610d1d565b82800160010185558215610d1d579182015b82811115610d1d578235825591602001919060010190610d02565b50610d29929150610d2d565b5090565b5b80821115610d295760008155600101610d2e565b600060208284031215610d5457600080fd5b81356001600160e01b031981168114610a3a57600080fd5b60005b83811015610d87578181015183820152602001610d6f565b838111156107b55750506000910152565b6020815260008251806020840152610db7816040850160208701610d6c565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114610de257600080fd5b919050565b600060208284031215610df957600080fd5b610a3a82610dcb565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215610e2b57600080fd5b610e3483610dcb565b9150602083013567ffffffffffffffff80821115610e5157600080fd5b818501915085601f830112610e6557600080fd5b813581811115610e7757610e77610e02565b604051601f8201601f19908116603f01168101908382118183101715610e9f57610e9f610e02565b81604052828152886020848701011115610eb857600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60008083601f840112610eec57600080fd5b50813567ffffffffffffffff811115610f0457600080fd5b6020830191508360208260051b8501011115610f1f57600080fd5b9250929050565b60008060008060008060608789031215610f3f57600080fd5b863567ffffffffffffffff80821115610f5757600080fd5b610f638a838b01610eda565b90985096506020890135915080821115610f7c57600080fd5b610f888a838b01610eda565b90965094506040890135915080821115610fa157600080fd5b50610fae89828a01610eda565b979a9699509497509295939492505050565b600080600060408486031215610fd557600080fd5b610fde84610dcb565b9250602084013567ffffffffffffffff80821115610ffb57600080fd5b818601915086601f83011261100f57600080fd5b81358181111561101e57600080fd5b87602082850101111561103057600080fd5b6020830194508093505050509250925092565b600181811c9082168061105757607f821691505b60208210810361107757634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6001600160a01b0393841681529190921660208201526001600160e01b0319909116604082015260600190565b60006020828403121561115457600080fd5b81518015158114610a3a57600080fd5b634e487b7160e01b600052603260045260246000fd5b6000808335601e1984360301811261119157600080fd5b83018035915067ffffffffffffffff8211156111ac57600080fd5b602001915036819003821315610f1f57600080fd5b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b81835260006020808501808196508560051b810191508460005b8781101561127e5782840389528135601e1988360301811261123557600080fd5b8701803567ffffffffffffffff81111561124e57600080fd5b80360389131561125d57600080fd5b61126a86828985016111d1565b9a87019a9550505090840190600101611214565b5091979650505050505050565b6060808252810186905260008760808301825b898110156112cc576001600160a01b036112b784610dcb565b1682526020928301929091019060010161129e565b5083810360208501528681526001600160fb1b038711156112ec57600080fd5b8660051b9150818860208301378181019150506020810160008152602084830301604085015261131d8186886111fa565b9a9950505050505050505050565b60006020828403121561133d57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600082516113a1818460208701610d6c565b919091019291505056fe44414f3a2063616c6c20726576657274656420776974686f7574206d657373616765360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122037bf10ebccfdc07656eb23ecb024e9b002b0988a865bed2f1e819763deb1b4e464736f6c634300080d0033";

type DAOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DAOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DAO__factory extends ContractFactory {
  constructor(...args: DAOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DAO> {
    return super.deploy(overrides || {}) as Promise<DAO>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DAO {
    return super.attach(address) as DAO;
  }
  override connect(signer: Signer): DAO__factory {
    return super.connect(signer) as DAO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DAOInterface {
    return new utils.Interface(_abi) as DAOInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DAO {
    return new Contract(address, _abi, signerOrProvider) as DAO;
  }
}
