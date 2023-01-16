import Carpark from "../dataclasses/Carpark";
import testCPJSON from './testCP.json';

const testCP = new Carpark.fromJSON(testCPJSON);

export { testCP };