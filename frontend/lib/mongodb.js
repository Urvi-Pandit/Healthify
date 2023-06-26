import mongoose from 'mongoose';

const connection={};

async function connect() {
    if(connection.isConnected)
    return;
    const db = await mongoose.connect('mongodb+srv://urvi:urvi@cluster0.wncyubn.mongodb.net/?retryWrites=true&w=majority')

    connection.isConnected = db.connections[0].readyState;
}

export default connect;