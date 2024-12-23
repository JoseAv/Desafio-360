import { createProductValidation, updateProductValidation } from '../validation/productValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import cloudinary from '../utils/configCloudinary.js'


export class ControllerProducts {
    constructor({ ModelProducts }) {
        this.modelProducts = ModelProducts
    }


    accionProducts = async (req, res) => {


        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        const data = JSON.parse(req.body.data)
        data.data.id_usuarios = req.session.id

        if (data.acction === 'C') {
            let newFoto
            if (req.file) {
                try {
                    const uploadResult = await uploadToCloudinary(req.file.buffer);
                    newFoto = uploadResult.secure_url;
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

        if (data.acction === 'U') {
            if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

            const data = JSON.parse(req.body.data)
            data.data.id_usuarios = req.session.id
            let newFoto


            if (req.file) {
                try {

                    const uploadResult = await uploadToCloudinary(req.file.buffer);
                    newFoto = uploadResult.secure_url;
                } catch (error) {
                    console.error('Error al subir a Cloudinary:', error);
                    return res.status(500).json({ message: 'Error al subir la imagen' });
                }
            }


            const validationProducts = updateProductValidation(data.data);
            if (!validationProducts.success) {
                return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') });
            }

            const newProducts = await this.modelProducts.updateProducts({
                data: { ...data.data, fotoUrl: newFoto },
            });
            return res.status(newProducts.statusCode).json({ ...newProducts });



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

