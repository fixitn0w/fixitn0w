const router = require('express').Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Review = require('../models/Review');
const upload = require('multer')({dest: './public/pics'});



/*
router.post("/new",checkIfAdmin, upload.array('photos',5), (req,res, next)=>{
  req.body.photos = [];
  console.log(req.body);
  for(let pic of req.files){
      req.body.photos.push('/pics/' + pic.filename);
  }
  req.body.user = req.user._id;
  console.log("perro", req.body);
  Project.create(req.body)
  .then(project=>{
      return User.findByIdAndUpdate(req.user._id, {$push:{projects:project._id}})
  })
  .then(user=>{
      res.redirect('/profile')
  })
  .catch(e=>next(e))

})

function checkIfAdmin(req,res,next){
    if(!req.isAuthenticated()) res.redirect('/login');
    if(req.user.role === "CLIENT") return next();
    return res.redirect('/projects');
}
*/
/*
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

router.get('/:id/edit', (req,res, next)=>{
    Project.findById(req.params.id)
    .then(project=>{
        res.render('projects/edit', {project});
    })
    .catch(e=>next(e))
})

router.post('/:id/edit', (req,res, next)=>{
    if(req.body.active) req.body.active = true;
    Project.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>{
        res.redirect('/projects/admin');
    })
    .catch(e=>next(e))
})



router.get('/admin', checkIfAdmin,(req,res, next)=>{
    Promise.all([User.find(), Project.find()])
    .then(r=>{
        res.render('projects/admin', {users:r[0], projects:r[1]});
    })
    .catch(e=>next(e));
})

//router.post('/admin', (req,res)=>{})

router.get('/jobs', (req, res, next)=>{
  const projects= Project.find()
  .then(projects=>{
    res.render('auth/jobs', {projects});

  })
});*/

/*
router.get('/jobs',(req, res) => {
  Project.find()
    .then(projects=>{

      res.render('auth/jobs', {projects});
    })

});*/

/*router.post('/:id', (req,res, next)=>{
    req.body.user = req.user._id;
    req.body.project = req.params.id;
    Review.create(req.body)
    .then((comment=>{
        return Project.findByIdAndUpdate(req.params.id, {$push:{reviews:review}})
    }))
    .then(project=>{
        res.redirect('/projects/' + req.params.id);
    })
    .catch(e=>next(e));
});

router.get('/:id', (req,res, next)=>{
    Project.findById(req.params.id)
    .populate('user')
    .then(project=>{
        res.render('projects/detail', {projects})
    })
    .catch(e=>next(e));
});

router.get('/', (req,res)=>{
  res.send("perro")
    /*Project.find({active:true})
    .populate('user')
    .then(projects=>res.render('projects/list', {projects}))
    .catch(e=>next(e));
})*/

router.post('/new', upload.array('photos',5),(req,res, next)=>{
    req.body.photos = [];
    for(let pic of req.files){
        req.body.photos.push('/pics/' + pic.filename);
    }
    req.body.user = req.user._id;
    console.log(req.body);
    Project.create(req.body)
    .then(project=>{
        req.user.projects.push(project._id);
        return User.findByIdAndUpdate(req.user._id, req.user)
    })
    .then(user=>{
        res.redirect('/profile')
    })
    .catch(e=>next(e))

});


router.get('/jobs', (req, res, next)=>{
  const projects= Project.find()
  .then(projects=>{
    res.render('auth/jobs', {projects});

  })})


router.get('/jobs',(req, res) => {
  Project.find()
    .then(projects=>{

      res.render('auth/jobs', {projects});
    })})





module.exports = router;
//
