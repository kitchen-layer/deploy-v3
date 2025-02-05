import CustomUnsupportedProtocol from "../artifacts/Unsupported.json";
import createDeployContractStep from "./meta/createDeployContractStep";

const extendedArtifact = {
	...CustomUnsupportedProtocol,
	contractName: "UnsupportedProtocol",
	bytecode: CustomUnsupportedProtocol.bytecode.object,
};

export const DEPLOY_UNSUPPORTED_PROTOCOL = createDeployContractStep({
	key: "unsupportedProtocolAddress",
	artifact: extendedArtifact,
});
