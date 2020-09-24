import { extname } from "path"

export const imageFilterFile = (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return  next(new Error('Only image files are allowed!!!'), false)
    }
    next(null, true)
}

export const editFileName = (req, file, next) => {
    const filename: string = file.originalname.split('.')[0]
    const fileextension: string = extname(file.originalname)

    next(null, `${filename}${fileextension}`)
}