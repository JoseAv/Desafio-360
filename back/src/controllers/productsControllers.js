import { createProductValidation, updateProductValidation } from '../validation/productValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import cloudinary from '../utils/configCloudinary.js'


export class ControllerProducts {
    constructor({ ModelProducts }) {
        this.modelProducts = ModelProducts
    }


    accionProducts = async (req, res) => {

        const data = JSON.parse(req.body.data)
        console.log(data)

        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        if (data.acction === 'C') {
            let newFoto
            if (req.file) {
                try {
                    const uploadResult = await uploadToCloudinary(req.file.buffer);
                    newFoto = uploadResult.secure_url;
                    console.log('Imagen subida con éxito:', newFoto);
                } catch (error) {
                    console.error('Error al subir a Cloudinary:', error);
                    return res.status(500).json({ message: 'Error al subir la imagen' });
                }
            }

            const validationProducts = createProductValidation(data.data);
            if (!validationProducts.success) {
                return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') });
            }

            const newProducts = await this.modelProducts.createProducts({
                data: { ...data.data, fotoUrl: newFoto },
            });
            return res.status(newProducts.statusCode).json({ ...newProducts });
        }

        if (acction === 'U') {
        }
    }


}


const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(fileBuffer);
    });
};

