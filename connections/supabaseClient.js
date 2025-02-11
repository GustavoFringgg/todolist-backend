const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// 替換成你的 Supabase URL 和密鑰
const supabaseUrl = process.env.supabaseUrl;
const supabaseKey = process.env.supabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("資料庫連線成功");
module.exports = supabase;
