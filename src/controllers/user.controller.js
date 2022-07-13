import jwt from 'jsonwebtoken';
import {validationSchema} from '~/helpers';
import {User} from '~/repositories';

const UserController = {};

UserController.login = async (req, res) => {
  // const {email, password} = req.body;
  // const user = await User.findByCredential(email, password);
  // console.log(user);

  // if (!user)
  //   return res
  //     .status(401)
  //     .send({error: 'Login failed! Check authentication credentials'});

  // const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
  // res.send({user, token});
  res.send('ok');
};

UserController.register = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    const result = validationSchema.user.register.validate(req.body);
    if (result.error) throw result.error;

    const doesExist = await User.findByEmail(email);
    if (doesExist) throw new Error(`${result.email} is already been registered`);

    return res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default UserController;
