import pg from 'pg';
const { Client } = pg;
const client = new Client({
    user: 'postgres',       // Thay bằng tên người dùng PostgreSQL
    host: 'localhost',           // Nếu bạn chạy PostgreSQL trên máy cục bộ
    database: 'quanlykhoahoc',   // Thay bằng tên cơ sở dữ liệu
    password: 'T*n123456',   // Thay bằng mật khẩu của người dùng
    port: 5432,
});
await client.connect();

const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message); // Hello world!

async function addNewUser(id, username, password) {
    try {

        const queryText = `
            INSERT INTO accounts (id_account, username, password)
            VALUES($1, $2, $3)
            RETURNING id_account
        `;

        const res = await client.query(queryText, [id, username, password]);
        console.log('User added successfully:', res.rows[0]);
    } catch (err) {
        console.log('Error adding user:', err);
    } finally {
        await client.end();
    }
}

async function getAllUsers() {
    try {
        const queryText = `
            SELECT * FROM accounts
        `;
        const res = await client.query(queryText);
        console.log('List of users:', res.rows);
    } catch (err) {
        console.log('Error getting users:', err);
    } finally {
        await client.end();
    }
}

// addNewUser('HV1', 'thumensu890', 'mensu');
getAllUsers();