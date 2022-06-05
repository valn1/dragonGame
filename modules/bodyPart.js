import segment from "../abstracts/segment.js";

export default class BodyPart extends segment{
    constructor(length,ax,ay,angle,parent){
        super(length,ax,ay,angle,parent);

    }
    create() {
        super.create();
    }
}