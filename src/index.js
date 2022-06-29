module.exports = function toReadable (number) {
    if (number === 0)
        return 'zero';

    let order = ['thousand', 'million', 'billion'];
    let result = [];

    function examinationNumber(number = '') {
        number = number.toString();
        for (let i = 0; i < number.length % 3; i++)
            number = '0' + number;
        return number;
    }

    function getTripleStr(triple = '') {
        let digits = [
            'one', 
            'two', 
            'three', 
            'four', 
            'five', 
            'six', 
            'seven', 
            'eight', 
            'nine'
        ];
        let teenNumbers = [
            'ten', 
            'eleven', 
            'twelve', 
            'thirteen', 
            'fourteen', 
            'fifteen', 
            'sixteen', 
            'seventeen', 
            'eighteen', 
            'nineteen',
        ];
        let decimal = [
            'twenty',
            'thirty',
            'forty',
            'fifty',
            'sixty',
            'seventy',
            'eighty',
            'ninety'
        ];
        let result = [];

        if (parseInt(triple[0]) !== 0) {
            result.push(digits[parseInt(triple[0]) - 1]);
            result.push('hundred');
        }
        if (parseInt(triple[1]) !== 0) {
            if (parseInt(triple[1]) !== 1) {
                result.push(decimal[parseInt(triple[1]) - 2]);
                if (parseInt(triple[2]) !== 0)
                    result.push(digits[parseInt(triple[2]) - 1]);
            }
            else
                result.push(teenNumbers[parseInt(triple[2])]);
        }
        else if (parseInt(triple[2]) !== 0)
            result.push(digits[parseInt(triple[2]) - 1]);

        let out = '';
        for (let i = 0; i < result.length - 1; i++)
            out += result[i] + ' ';
        return out + result[result.length - 1];
    }

    number = examinationNumber(number);

    let cell = 0;
    for (let i = number.length; i > 0; i -= 3) {
        if (i !== number.length)
            result = getTripleStr(number.substring(i - 3, i)) + ' ' + order[cell++] + ' ' + result;
        else
            result = getTripleStr(number.substring(i - 3, i));
    }

    return result;
}