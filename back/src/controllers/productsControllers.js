import { createProductValidation, updateProductValidation } from '../validation/productValidation.js'
import { ValidationResponse, MessagePersonalise } from '../utils/informationValidation.js'
import cloudinary from '../utils/configCloudinary.js'


export class ControllerProducts {
    constructor({ ModelProducts }) {
        this.modelProducts = ModelProducts
    }


    accionProducts = async (req, res) => {

        if (!req.session) return ValidationResponse.Denied({ message: MessagePersonalise.errorSession('Dato correcto') })

        if (req.body.data) {
            let data = null
            if (typeof req.body.data === 'string') {

                let dataParse = JSON.parse(req.body.data)
                console.log(dataParse)
                data = dataParse.data
                data.data.id_usuarios = req.session.id
            } else {
                data = req.body.data
                data.id_usuarios = req.session.id
            }


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

                const newData = { ...data.data, fotoUrl: newFoto ?? null }

                const validationProducts = createProductValidation(newData);
                if (!validationProducts.success) {
                    return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') });
                }

                const newProducts = await this.modelProducts.createProducts({
                    data: newData,
                });
                return res.status(newProducts.statusCode).json({ ...newProducts });
            }

            if (data.acction === 'U') {
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
                console.log('entrada aqui')
                const validationProducts = updateProductValidation(data)
                console.log(validationProducts)
                if (!validationProducts.success) {
                    return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Dato correcto') });
                }
                const newProducts = await this.modelProducts.updateProducts({
                    data: { ...data.data, fotoUrl: newFoto ?? null },
                });
                return res.status(newProducts.statusCode).json({ ...newProducts });
            }
            const newAction = req.body

            if (newAction.acction === 'UU') {

                if (!data.id) return ValidationResponse.Denied({ message: MessagePersonalise.DataEmpty('Id No existe') });
                console.log('entrada aqui', data)
                const newProducts = await this.modelProducts.updateEstado({ data: data });
                return res.status(newProducts.statusCode).json({ ...newProducts });
            }

            if (newAction.acction === 'VI') {

                const newProducts = await this.modelProducts.viewOneProducts({ id: data.id });
                return res.status(newProducts.statusCode).json({ ...newProducts });
            }



        } else {
            const newAction = req.body

            if (newAction.acction === 'V') {
                const newProducts = await this.modelProducts.viewAllProducts();
                return res.status(newProducts.statusCode).json({ ...newProducts });
            }


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

