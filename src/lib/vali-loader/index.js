module.exports = function (source) {
    const data = JSON.parse(source);
    const map = {
        Int64: ["ToInt64", "TypeInt64"],
        Int32: ["ToInt32", "TypeInt32"],
        String: ["ToString", "TypeString"]
    };

    let res = "import { Reviser, TypeInt32, ToInt32, ToInt64, TypeInt64, ToString, TypeString, MaxLength, MinLength, Required } from 'data-reviser';" +
        "export default class " + data.name + " extends Reviser {";

    for (const item of data.data) {
        if (item.type) {
            res += "@" + map[item.type][0] + "  @" + map[item.type][1] + "('" + (item.message || "") + "')";
        }
        if (item.required) {
            res += "@Required()";
        }
        if (item.maxLength) {
            res += "@MaxLength(" + item.maxLength + ")";
        }
        if (item.minLength) {
            res += "@MinLength(" + item.minLength + ")";
        }
        if (item.default) {
            res += item.key + "=" + (typeof item.default === "string" ? "'" : "") + item.default + (typeof item.default === "string" ? "'" : "") + ";";
        } else {
            res += item.key + ";";
        }
    }

    res += "}";

    return res;
};