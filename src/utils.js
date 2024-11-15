/**
 * 
 * @param {*} artwork
 * @param {*} rules 
 * @returns 
 */
const TypesAutorisés = ["PEINTURE", "SCULPTURE", "DESSIN", "ASCII_ART"];
const rules = {

    "title": {
        validator: (_title) => typeof _title === 'string' || _title === '',
        message: "Le nom doit etre une chaine non vide"
    },
    "artist": {
        validator: (_artist) => typeof _artist === 'string' || _artist === '',
        message: "Le nom doit etre une chaine non vide"
    
    },
    "type": {
        validator: (_type) => typeof _type === 'string' || _type === '' && !TypesAutorisés.includes(_type),
        message: "Le nom doit etre une chaine non vide et doit être parmi les valeurs autorisées."
    
    },
    "year": {
        validator: (_year) => typeof _year === undefined && (!Number.isInteger(_year) || _year <= 0),
        message: "Le champ 'year', s'il est défini, doit être un entier positif."
    }
}


const artworkDataValidator = (artwork, rules) => {

    return new Proxy(artwork, {
        set(artwork, prop, new_value) {
            const field_rule = rules[prop];
            if(typeof field_rule === "object") {
                if(field_rule.validator(new_value)){
                   return Reflect.set(artwork, prop, new_value)
                }
                throw new Error(field_rule.message);
            }
            throw new Error("Proprieté invalide !");
        }
    });
}
module.exports = { artworkDataValidator };