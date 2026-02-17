const mongoose = require('mongoose');

const uri =  'mongodb+srv://Asadullah_129:Asad129@cluster0.mo2vpbv.mongodb.net/asdb?retryWrites=true&w=majority';

mongoose.connect(uri)
.then(() => console.log('MongoDB  conected'))
.catch(err => console.error('MongoDB conection error:' , err));