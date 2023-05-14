import formidable from "formidable";
import type {NextApiRequest} from "next";

interface ParsedFormData {
    fields: any;
    files: any;
}

const parsedFormData = async (request: NextApiRequest): Promise<ParsedFormData> => await new Promise<ParsedFormData>((resolve, reject) => {
    const form = formidable();

    form.parse(request, (err, fields, files) => {
        if (err) reject({err})
        resolve({fields, files})
    });
})

export default parsedFormData;