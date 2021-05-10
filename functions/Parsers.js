function parseLatex(msg) {
    msg = msg.replaceAll("[tex]", "");
    msg = msg.replaceAll("[/tex]", "");
    msg = msg.replaceAll("^{2}", "²");
    msg = msg.replaceAll("^2", "²");
    msg = msg.replaceAll("^3", "³");
    msg = msg.replaceAll("^{3}", "³");
    msg = msg.replaceAll("*", "ˣ")
    
    return msg;
}

module.exports = parseLatex;