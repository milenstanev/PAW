import express from 'express';
import router from 'router';

router.get('/', function (req, res) {
    console.log(req.user);
    res.render('user', {user: req.user});
})

export default router;