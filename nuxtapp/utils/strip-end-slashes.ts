const reSlashes = /^(.*?)(\/*)$/;
const strip = (_$0: string, $1: string) => $1;
const stripEndSlashes = (text = "") => text.replace(reSlashes, strip);
export default stripEndSlashes;
