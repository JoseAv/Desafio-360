import { createProductValidation, updateProductValidation } from '../validation/productValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'


export class ControllerProducts {
    constructor({ ModelProducts }) {
        this.modelProducts = ModelProducts
    }


    accionProducts = async (req, res) => {
        const { acction, data } = req.body
        let newFoto
        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        if (acction === 'C') {
            let newFoto = null;

            if (req.file) {
                try {
                    const uploadResult = await uploadToCloudinary(req.file.buffer);
                    newFoto = uploadResult.secure_url; // URL de la imagen
                    console.log('Imagen subida con éxito:', newFoto);
                } catch (error) {
                    console.error('Error al subir a Cloudinary:', error);
                    return res.status(500).json({ message: 'Error al subir la imagen' });
                }
            }

            const validationProducts = createProductValidation(data);
            if (!validationProducts.success) {
                return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') });
            }

            const newProducts = await this.modelProducts.createProducts({
                data: { ...data, fotoUrl: newFoto },
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

