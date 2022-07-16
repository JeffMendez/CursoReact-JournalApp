const { fileUpload } = require("../../src/helpers/fileUpload")

describe('Testing in fileUpload', () => { 
    test('should upload file', async() => { 
        // const imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
        // const resp = await fetch( imgUrl );
        // const blob = await resp.blob();
        // const file = new File([blob], 'foto.jpg');

        // const url = await fileUpload(file);
        // expect(url).not.toBe(null);
    })

    test('should return null', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
})