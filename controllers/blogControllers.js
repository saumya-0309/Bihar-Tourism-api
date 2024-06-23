const prisma = require("../prisma");

const addBlog = async (req, res) => {
    try {
        const { title, body, author, tags, image } = req.body;
        if (!title || !image || !author || !tags || !body) {
            return res.status(400).json({
                status: false,
                message: 'Invalid data, please provide all required fields'
            })
        }
        let tag = tags.split(",");
        tag = tag.map((data) => data.trim());
        const slug = title.trim().toLowerCase().split(" ").join("-");
        const newBlog = await prisma.blogs.create({
            data: {
                title,
                image,
                body,
                author,
                tags: tag,
                slug
            }
        });
        return res.status(200).json({
            success: true,
            data: newBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blogs = await prisma.blogs.findMany();
        return res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}

const getBlogBySlug = async (req , res) => {
    try {
        const { slug } = req.params;
        const blog = await prisma.blogs.findFirst({
            where: {
                slug
            }
        });
        return res.status(200).json({
            success: true,
            data: blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { addBlog , getAllBlog , getBlogBySlug }