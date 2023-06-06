import { Token } from "src/interface/token.interface";
interface Owner {

    token: string;

    hasLens: boolean;
}
export class CreateTokenDto extends Token {
    name: string;
    token: string;
    ownerList: Array<Owner>;
}