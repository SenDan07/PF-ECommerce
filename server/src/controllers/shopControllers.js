

const shopControllers={
    filterBooksByAuthors:(req, res) => {
        try {
            const { author } = req.query;
    
            if (!author) throw "Debe enviar un author"
            const authorsFound = libros.filter(el => el.author.toUpperCase().includes(author.toUpperCase()))
            if (authorsFound.length < 1) throw "El author no existe"
            return res.status(200).json(authorsFound)
        } catch (error) {
            return res.status(400).send(error)
        }
    
    }
}


module.exports = shopControllers