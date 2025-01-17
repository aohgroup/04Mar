

//var url = "http://localhost:3000/posts";
var url = "https://3000-aohgroup-04mar-mnb5mz3ukp1.ws-us108.gitpod.io/comments";

var global;


function Load() {
    fetch(url).then(
        function (response) {
            return response.json();
        }
    ).then(function (posts) {
        global = posts;
        document.getElementById("tbody").innerHTML = "";
        posts.sort(Compare);
        for (const post of posts) {
            var tbody = document.getElementById("tbody");
            tbody.innerHTML += ConvertDataPostToRow(post);
        }
    }).catch(
        function (err) {
            console.log(err);
        })
}

function Compare(a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
    }
    return -1;
}

function Delete(id) {
    fetch(url + "/" + id, {
        method: 'DELETE'
    }).then(
        Load()
    )
}

function getMaxId() {
    var ids = global.map(element => element.id);
    return Math.max(...ids);
}
function findID(id) {
    var ids = global.map(element => element.id);
    return ids.includes(id);
}
function Create(data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        function () {
            Load();
        }
    )
}

function Edit(id, data) {
    fetch(url + "/" + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(
        function () {
            Load();
        }
    )
}

function Save() {
    var id = parseInt(document.getElementById("id").value);
    if (isNaN(id)) {

        var newItem = {
            id: (getMaxId() + 1) + "",
            postId: document.getElementById("postId").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            body: document.getElementById("body").value
        }
        //debugger;
        Create(newItem);
    } else {
        if (!findID(id + "")) {
            var newItem = {
                id: id + "",
                postId: document.getElementById("postId").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                body: document.getElementById("body").value
            }
            //debugger;
            Create(newItem);
        } else {
            var editItem = {
                postId: document.getElementById("postId").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                body: document.getElementById("body").value
            }
            Edit(id, editItem);
        }
    }
}


function ConvertDataPostToRow(post) {
    var string = '<tr>';
    string += '<td>' + post.id + '</td>'
    string += '<td>' + post.postId + '</td>'
    string += '<td>' + post.name + '</td>'
    string += '<td>' + post.email + '</td>'
    string += '<td>' + post.body + '</td>'
    string += '<td><button onClick ="Delete(' + post.id + ')">Delete</button></td>'
    string += '</tr>'
    return string;
}

