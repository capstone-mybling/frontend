import formidable from "formidable";
import type {NextApiRequest} from "next";

interface ParsedFormData<T> {
    fields: T;
    files: {
        [key: string]: formidable.File;
    }
}

const parsedFormData = async <T>(request: NextApiRequest) => await new Promise<ParsedFormData<T>>((resolve, reject) => {
    const form = formidable();

    form.parse(request, (err, fields, files) => {
        if (err) reject({err})
        resolve({fields, files})
    });
})

export default parsedFormData;