import "dotenv/config";

// membuat object parameter sebagai FORM-DATA
const parameter = new FormData();
parameter.append("apikey", process.env.API_KEY);

// mengatasi setiap parameter yg akan dimasukkan ke dalam FORM
const paramHandler = object => {
    const params = Object.keys(object);
    params.forEach(param => {
        parameter.append(param, object[param]);
    });
};

// menerima setiap parameter dan mengmbalikan object parameter
const getParameter = object => {
    paramHandler(object);
    return parameter;
};

const searchResultFilter = (data, page) => {
    // mengubah setiap data laptop dari bentuk json menjadi array
    const laptops = Object.values(data);

    // mengurutkan nama laptop berdasarkan submodel-nya
    laptops.sort((a, b) =>
        a.model_info[0].submodel_info[0] < b.model_info[0].submodel_info[0]
            ? -1
            : 1
    );

    let submodel = "";
    const laptopFiltered = [];

    laptops.forEach(laptop => {
        const model_name = laptop.model_info[0].name;
        const submodel_name = laptop.model_info[0].submodel_info[0];
        const laptop_name = `${model_name} ${submodel_name}`;
        const laptop_id = laptop.model_info[0].id;
        if (laptop_name != submodel) {
            submodel = laptop_name;
            laptopFiltered.push({name: laptop_name, id: laptop_id});
        }
    });

    const page_start = (page - 1) * 10;
    const page_end = page * 10;

    return laptopFiltered.slice(page_start, page_end);
};

export { getParameter, searchResultFilter };
