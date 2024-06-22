const bcrypt = require('bcrypt')
const {pool} = require('../config/database')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path')
const {home_page} = require('../constants')
dotenv.config({path: path.join(home_page, 'config/config.env')});


const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.json({status: 400, message: "Username and password are required"})
    }
    const result = await pool.query('SELECT * FROM public.users WHERE username = $1', [username])
    const user = result.rows[0]
       
    if (!user) return res.json({status: 401, message: "Invalid Credentials"})

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        await pool.query('UPDATE public.users SET refresh_token = $1 WHERE username = $2', [refreshToken, username]);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ status:200, message: "LoggedIn Successful", token: accessToken })        
    } else {
        res.json({status: 401, message: "Invalid Credentials"})
    }

    
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cqueryookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const result = await pool.ququeryery('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])
    const user = result.rows[0]

    if (!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json({ status:200, message: "LoggedIn Successful", token: accessToken })
        }
    );
}

module.exports = { handleLogin, handleRefreshToken}