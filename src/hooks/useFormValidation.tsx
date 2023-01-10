import { useState } from 'react';

/*

*/

export const useFormValidation = () => {
    const [fieldRules, setFieldRules] = useState<any>({});
    console.log(fieldRules, 'consoling field rules');
    const registerFields = (fieldConfig: {fieldName: string, rules: any} []) => {
        const newRules: any = {};
        fieldConfig.forEach(({fieldName, rules}) => {
            newRules[fieldName] = { fieldName: fieldName, rules: rules, errors: []}
        });
        setFieldRules((prevFieldRules: any) => ({...prevFieldRules, ...newRules}));
    };
    return { fieldRules, registerFields };
};