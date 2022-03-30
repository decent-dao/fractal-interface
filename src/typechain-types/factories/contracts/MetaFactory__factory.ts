/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MetaFactory,
  MetaFactoryInterface,
} from "../../contracts/MetaFactory";

const _abi = [
  {
    inputs: [],
    name: "CreateDAOReverted",
    type: "error",
  },
  {
    inputs: [],
    name: "CreateGovernorReverted",
    type: "error",
  },
  {
    inputs: [],
    name: "CreateTreasuryReverted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "daoFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "governorFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasuryFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasuryImplementation",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "daoImplementation",
            type: "address",
          },
          {
            internalType: "address",
            name: "accessControlImplementation",
            type: "address",
          },
          {
            internalType: "string",
            name: "daoName",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "roles",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "rolesAdmins",
            type: "string[]",
          },
          {
            internalType: "address[][]",
            name: "members",
            type: "address[][]",
          },
          {
            internalType: "string[]",
            name: "daoFunctionDescs",
            type: "string[]",
          },
          {
            internalType: "string[][]",
            name: "daoActionRoles",
            type: "string[][]",
          },
          {
            internalType: "address[]",
            name: "moduleTargets",
            type: "address[]",
          },
          {
            internalType: "string[]",
            name: "moduleFunctionDescs",
            type: "string[]",
          },
          {
            internalType: "string[][]",
            name: "moduleActionRoles",
            type: "string[][]",
          },
        ],
        internalType: "struct IDAOFactory.CreateDAOParams",
        name: "createDAOParams",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "contract IGovernorModule",
            name: "_govImpl",
            type: "address",
          },
          {
            internalType: "contract IVotesUpgradeable",
            name: "_token",
            type: "address",
          },
          {
            internalType: "contract ITimelockUpgradeable",
            name: "_timelockImpl",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "_initialVoteExtension",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "_initialVotingDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialVotingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialProposalThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_initialQuorumNumeratorValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_minDelay",
            type: "uint256",
          },
        ],
        internalType: "struct IGovernorFactory.CreateGovernorParams",
        name: "createGovernorParams",
        type: "tuple",
      },
    ],
    name: "createDAOAndModules",
    outputs: [
      {
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        internalType: "address",
        name: "accessControl",
        type: "address",
      },
      {
        internalType: "address",
        name: "timelock",
        type: "address",
      },
      {
        internalType: "address",
        name: "governor",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611dc1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806301ffc9a71461003b5780635aabc0e814610063575b600080fd5b61004e610049366004611365565b6100b0565b60405190151581526020015b60405180910390f35b6100766100713660046113be565b6100e7565b604080516001600160a01b03968716815294861660208601529285169284019290925283166060830152909116608082015260a00161005a565b60006001600160e01b03198216630b55781d60e31b14806100e157506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008060008060008a6001600160a01b031663ca9a367f33896040518363ffffffff1660e01b815260040161011d929190611691565b60408051808303816000875af115801561013b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061015f9190611858565b60405163379c6c7f60e11b815291965094506001600160a01b038b1690636f38d8fe9061019490889088908b906004016118aa565b60408051808303816000875af11580156101b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d69190611858565b6040516357df78d960e01b81526001600160a01b0387811660048301528b81166024830152929550909350908a16906357df78d9906044016020604051808303816000875af115801561022d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102519190611998565b6040805160028082526060820190925291925060009190816020015b606081526020019060019003908161026d5790505090506040518060400160405280600c81526020016b455845435554455f524f4c4560a01b815250816000815181106102bc576102bc6119cb565b602002602001018190525060405180604001604052806008815260200167474f565f524f4c4560c01b815250816001815181106102fb576102fb6119cb565b602090810291909101015260408051600280825260608201909252600091816020015b606081526020019060019003908161031e5790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110610369576103696119cb565b60200260200101819052506040518060400160405280600881526020016744414f5f524f4c4560c01b815250816001815181106103a8576103a86119cb565b602090810291909101015260408051600280825260608201909252600091816020015b60608152602001906001900390816103cb57505060408051600180825281830190925291925060009190602080830190803683370190505090508681600081518110610419576104196119cb565b60200260200101906001600160a01b031690816001600160a01b031681525050808260008151811061044d5761044d6119cb565b60209081029190910101526040805160018082528183019092526000918160200160208202803683370190505090508681600081518110610490576104906119cb565b60200260200101906001600160a01b031690816001600160a01b03168152505080836001815181106104c4576104c46119cb565b6020908102919091010152505060408051600b8082526101808201909252600091816020016020820280368337019050509050868160008151811061050b5761050b6119cb565b60200260200101906001600160a01b031690816001600160a01b031681525050868160018151811061053f5761053f6119cb565b60200260200101906001600160a01b031690816001600160a01b0316815250508681600281518110610573576105736119cb565b60200260200101906001600160a01b031690816001600160a01b03168152505086816003815181106105a7576105a76119cb565b60200260200101906001600160a01b031690816001600160a01b03168152505085816004815181106105db576105db6119cb565b60200260200101906001600160a01b031690816001600160a01b031681525050868160058151811061060f5761060f6119cb565b60200260200101906001600160a01b031690816001600160a01b0316815250508481600681518110610643576106436119cb565b60200260200101906001600160a01b031690816001600160a01b0316815250508481600781518110610677576106776119cb565b60200260200101906001600160a01b031690816001600160a01b03168152505084816008815181106106ab576106ab6119cb565b60200260200101906001600160a01b031690816001600160a01b03168152505084816009815181106106df576106df6119cb565b60200260200101906001600160a01b031690816001600160a01b0316815250508481600a81518110610713576107136119cb565b6001600160a01b03929092166020928302919091019091015260408051600b8082526101808201909252600091816020015b60608152602001906001900390816107455790505090506040518060400160405280601481526020017375706461746544656c61792875696e743235362960601b8152508160008151811061079c5761079c6119cb565b6020026020010181905250604051806080016040528060428152602001611c7b60429139816001815181106107d3576107d36119cb565b60200260200101819052506040518060400160405280600f81526020016e63616e63656c28627974657333322960881b81525081600281518110610819576108196119cb565b6020026020010181905250604051806060016040528060398152602001611d536039913981600381518110610850576108506119cb565b60200260200101819052506040518060400160405280601281526020017175706772616465546f28616464726573732960701b81525081600481518110610899576108996119cb565b60200260200101819052506040518060400160405280601281526020017175706772616465546f28616464726573732960701b815250816005815181106108e2576108e26119cb565b60200260200101819052506040518060400160405280602081526020017f776974686472617745746828616464726573735b5d2c75696e743235365b5d2981525081600681518110610936576109366119cb565b6020026020010181905250604051806060016040528060318152602001611d22603191398160078151811061096d5761096d6119cb565b6020026020010181905250604051806060016040528060328152602001611c4960329139816008815181106109a4576109a46119cb565b6020026020010181905250604051806060016040528060328152602001611cbd60329139816009815181106109db576109db6119cb565b6020026020010181905250604051806060016040528060338152602001611cef6033913981600a81518110610a1257610a126119cb565b602090810291909101015260408051600b8082526101808201909252600091816020015b6060815260200190600190039081610a3657505060408051600180825281830190925291925060009190602082015b6060815260200190600190039081610a6557905050905060405180604001604052806008815260200167474f565f524f4c4560c01b81525081600081518110610ab057610ab06119cb565b60200260200101819052508082600081518110610acf57610acf6119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610af157905050905060405180604001604052806008815260200167474f565f524f4c4560c01b81525081600081518110610b3c57610b3c6119cb565b60200260200101819052508083600181518110610b5b57610b5b6119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610b7d57905050905060405180604001604052806008815260200167474f565f524f4c4560c01b81525081600081518110610bc857610bc86119cb565b60200260200101819052508084600281518110610be757610be76119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610c0957905050905060405180604001604052806008815260200167474f565f524f4c4560c01b81525081600081518110610c5457610c546119cb565b60200260200101819052508085600381518110610c7357610c736119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610c955790505090506040518060400160405280600c81526020016b555047524144455f524f4c4560a01b81525081600081518110610ce457610ce46119cb565b60200260200101819052508086600481518110610d0357610d036119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610d255790505090506040518060400160405280600c81526020016b555047524144455f524f4c4560a01b81525081600081518110610d7457610d746119cb565b60200260200101819052508087600581518110610d9357610d936119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610db55790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110610e0057610e006119cb565b60200260200101819052508088600681518110610e1f57610e1f6119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610e415790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110610e8c57610e8c6119cb565b60200260200101819052508089600781518110610eab57610eab6119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610ecd5790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110610f1857610f186119cb565b6020026020010181905250808a600881518110610f3757610f376119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610f595790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110610fa457610fa46119cb565b6020026020010181905250808b600981518110610fc357610fc36119cb565b6020908102919091010152604080516001808252818301909252600091816020015b6060815260200190600190039081610fe55790505090506040518060400160405280600881526020016744414f5f524f4c4560c01b81525081600081518110611030576110306119cb565b6020026020010181905250808c600a8151811061104f5761104f6119cb565b602002602001018190525050505050505050505050506000600267ffffffffffffffff811115611081576110816119b5565b6040519080825280602002602001820160405280156110aa578160200160208202803683370190505b5090508a816000815181106110c1576110c16119cb565b60200260200101906001600160a01b031690816001600160a01b0316815250508a816001815181106110f5576110f56119cb565b6001600160a01b03929092166020928302919091018201526040805160028082526060820183526000939192909183019080368337019050509050600081600081518110611145576111456119cb565b602002602001018181525050600081600181518110611166576111666119cb565b602090810291909101015260408051600280825260608201909252600091816020015b60608152602001906001900390816111895790505090508888886040516024016111b593929190611aaf565b60408051601f198184030181529190526020810180516001600160e01b031663024d8aa160e11b179052815182906000906111f2576111f26119cb565b602002602001018190525085858560405160240161121293929190611b36565b60408051601f198184030181529190526020810180516001600160e01b03166334e7dc6560e11b179052815182906001908110611251576112516119cb565b602090810291909101015260405163a516a5bf60e01b81526001600160a01b038f169063a516a5bf9061128c90869086908690600401611bad565b600060405180830381600087803b1580156112a657600080fd5b505af11580156112ba573d6000803e3d6000fd5b505050508c6001600160a01b031663a1e6ab9f306040518263ffffffff1660e01b815260040161131c91906040808252600c908201526b455845435554455f524f4c4560a01b60608201526001600160a01b0391909116602082015260800190565b600060405180830381600087803b15801561133657600080fd5b505af115801561134a573d6000803e3d6000fd5b50505050505050505050505050965096509650965096915050565b60006020828403121561137757600080fd5b81356001600160e01b03198116811461138f57600080fd5b9392505050565b6001600160a01b03811681146113ab57600080fd5b50565b80356113b981611396565b919050565b60008060008060008060c087890312156113d757600080fd5b86356113e281611396565b955060208701356113f281611396565b9450604087013561140281611396565b9350606087013561141281611396565b9250608087013567ffffffffffffffff8082111561142f57600080fd5b90880190610160828b03121561144457600080fd5b90925060a0880135908082111561145a57600080fd5b508701610140818a03121561146e57600080fd5b809150509295509295509295565b6000808335601e1984360301811261149357600080fd5b830160208101925035905067ffffffffffffffff8111156114b357600080fd5b8036038313156114c257600080fd5b9250929050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6000808335601e1984360301811261150957600080fd5b830160208101925035905067ffffffffffffffff81111561152957600080fd5b8060051b36038313156114c257600080fd5b60008383855260208086019550808560051b8301018460005b8781101561158e57848303601f1901895261156f828861147c565b61157a8582846114c9565b9a86019a9450505090830190600101611554565b5090979650505050505050565b8183526000602080850194508260005b858110156115d95781356115be81611396565b6001600160a01b0316875295820195908201906001016115ab565b509495945050505050565b81835260006020808501808196508560051b810191508460005b8781101561163457828403895261161582886114f2565b61162086828461159b565b9a87019a95505050908401906001016115fe565b5091979650505050505050565b81835260006020808501808196508560051b810191508460005b8781101561163457828403895261167282886114f2565b61167d86828461153b565b9a87019a955050509084019060010161165b565b6001600160a01b03831681526040602082018190526116c29082016116b5846113ae565b6001600160a01b03169052565b60006116d0602084016113ae565b6001600160a01b031660608301526116eb604084018461147c565b6101608060808601526117036101a0860183856114c9565b925061171260608701876114f2565b9250603f19808786030160a088015261172c85858461153b565b945061173b60808901896114f2565b94509150808786030160c088015261175485858461153b565b945061176360a08901896114f2565b94509150808786030160e088015261177c8585846115e4565b945061178b60c08901896114f2565b945091506101008188870301818901526117a686868561153b565b95506117b560e08a018a6114f2565b955092506101208289880301818a01526117d0878786611641565b96506117de828b018b6114f2565b9650935061014091508289880301828a01526117fb87878661159b565b9650611809818b018b6114f2565b965093505081888703018489015261182286868561153b565b9550611830818a018a6114f2565b95509350508087860301610180880152505061184d838383611641565b979650505050505050565b6000806040838503121561186b57600080fd5b825161187681611396565b602084015190925061188781611396565b809150509250929050565b803567ffffffffffffffff811681146113b957600080fd5b6001600160a01b038481168252831660208201526060604082018190526000906118d99083016116b5856113ae565b6118e5602084016113ae565b6001600160a01b031660808301526118ff604084016113ae565b6001600160a01b031660a083015261191a606084018461147c565b6101408060c08601526119326101a0860183856114c9565b925061194060808701611892565b67ffffffffffffffff811660e08701529150610100915060a08601358286015261012060c08701358187015260e087013582870152828701356101608701528087013561018087015250505080915050949350505050565b6000602082840312156119aa57600080fd5b815161138f81611396565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000815180845260005b81811015611a07576020818501810151868301820152016119eb565b81811115611a19576000602083870101525b50601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b85811015611634578284038952611a648483516119e1565b98850198935090840190600101611a4c565b600081518084526020808501945080840160005b838110156115d95781516001600160a01b031687529582019590820190600101611a8a565b606081526000611ac26060830186611a2e565b602083820381850152611ad58287611a2e565b915083820360408501528185518084528284019150828160051b85010183880160005b83811015611b2657601f19878403018552611b14838351611a76565b94860194925090850190600101611af8565b50909a9950505050505050505050565b606081526000611b496060830186611a76565b602083820381850152611b5c8287611a2e565b915083820360408501528185518084528284019150828160051b85010183880160005b83811015611b2657601f19878403018552611b9b838351611a2e565b94860194925090850190600101611b7f565b606081526000611bc06060830186611a76565b82810360208481019190915285518083528682019282019060005b81811015611bf757845183529383019391830191600101611bdb565b5050848103604086015285518082528282019350600581901b8201830183880160005b83811015611b2657601f19858403018752611c368383516119e1565b96860196925090850190600101611c1a56fe77697468647261774552433230546f6b656e7328616464726573735b5d2c616464726573735b5d2c75696e743235365b5d297363686564756c65426174636828616464726573735b5d2c75696e743235365b5d2c62797465735b5d2c627974657333322c627974657333322c75696e74323536296465706f736974455243373231546f6b656e7328616464726573735b5d2c616464726573735b5d2c75696e743235365b5d297769746864726177455243373231546f6b656e7328616464726573735b5d2c616464726573735b5d2c75696e743235365b5d296465706f7369744552433230546f6b656e7328616464726573735b5d2c616464726573735b5d2c75696e743235365b5d2965786563757465426174636828616464726573735b5d2c75696e743235365b5d2c62797465735b5d2c627974657333322c6279746573333229a2646970667358221220b50930f5c9b52052abd534353dd45acc6699f295115009d6bb105669cbff5b3664736f6c634300080d0033";

type MetaFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MetaFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MetaFactory__factory extends ContractFactory {
  constructor(...args: MetaFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MetaFactory> {
    return super.deploy(overrides || {}) as Promise<MetaFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MetaFactory {
    return super.attach(address) as MetaFactory;
  }
  override connect(signer: Signer): MetaFactory__factory {
    return super.connect(signer) as MetaFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MetaFactoryInterface {
    return new utils.Interface(_abi) as MetaFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MetaFactory {
    return new Contract(address, _abi, signerOrProvider) as MetaFactory;
  }
}
