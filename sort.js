const { log } = require("console");
const fs = require("fs");

// 指定需要操作的文件名
const filename = process.argv[2];

// 读取文件内容
fs.readFile(filename, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  // 按行分割文件内容
  const lines = data.trim().split("\n");

  // 将每一行按制表符分割成数组，并保存到二维数组中
  const array = lines
    .map((line) => line.split(" "))
    .map((item) => {
      item[2] = Number(item[2]);
      return item;
    });

  // console.log(array);

  const result = [];

  array.forEach((item) => {
    if (!result.length || item[2] <= result[result.length - 1]?.[result[result.length - 1].length - 1]?.[2]) {
      result.push([item]);
    } else {
      result[result.length - 1].push(item);
    }
  })

  result.forEach((j) => {
    j.forEach((k, i) => {
      k[2] = j.length - i;
    })
  });

  // 转成一维数组
  // const result1 = result.flat().join("\t").join("\n");
  const result1 = result.flat().map((item) => item.join("\t")).join("\n");


  // console.log(result1);
  // // 将结果写入到指定的文件中
  fs.writeFile('output.txt', result1, function (err) {
    if (err) return console.log(err);
    console.log('Merge and sort complete!');
  });
});
