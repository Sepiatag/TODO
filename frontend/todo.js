let updateMode = false;

const cancelDeleteButton = document.getElementById('cancelDeleteButton');
cancelDeleteButton.addEventListener('click', function() {
    const confirmDeleteDialog= document.getElementById('confirmDeleteDialog');
    confirmDeleteDialog.close();
});

const confirmDeleteButton = document.getElementById('confirmDeleteButton');
confirmDeleteButton.addEventListener('click', () => {
    const id = document.getElementById('idToDelete')
    fetch('http://localhost:9000/delete.php?id=' + id.value)
    .then( () => {git
        alert('Registro Eliminado');
        showTasks();
    } )
    .catch( (error) => {
        console.log(error);
        alert('No se pudo eliminar el registro');
    })

})

function insert(){
    const id = document.getElementById('id').value;
    const name= document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const task = {
        id:id,
        name:name,
        description:description,
        date:date
    };
    
    let apiFile = 'insert.php';
    if(updateMode == true) apiFile ='update.php';

    fetch(`http://localhost/insert.php/${apiFile}`,{method:'post', body: JSON.stringify(task)})
    .then(() => {
        
        alert("Tarea Registrada")
        showTasks()
    })
    .catch( (error) => {
        console.log(error)
        alert("NO se pudo registrar la tarea ")
    } )
}
function showTasks(){
    fetch("http://localhost:9000/list.php")
    .then(response => data = response.json())
    .then(data => {
        tasks = data
        renderTasks(tasks)
    })
    .catch( error => {
        console.log(error)
        alert("Error al listar las tareas")
    })
}   

function renderTasks(tasks){


    clearTasks();

    for(let i=0; i<tasks.length; i++){

       
        const colName = document.createElement('td');
         colName.innerHTML = tasks[i].name;

        const colDescription = document.createElement('td');
         colDescription.innerHTML = tasks[i].description;

        const colDate = document.createElement('td');
         colDate.innerHTML = tasks[i].date;

        const colStatus = document.createElement('td');
         colStatus.innerHTML = tasks[i].status;

        const colUpdate = document.createElement('button');
        colUpdate.innerHTML = 'Editar';
        colUpdate.setAttribute('onclick', `fillForm('${tasks[i].id}','${tasks[i].name}','${tasks[i].description}','${tasks[i].date}')`);

        const colDelete = document.createElement('button');
        colDelete.innerHTML = 'Eliminar';
        colDelete.setAttribute('onclick', `confirmDelete('${tasks[i].id}','${tasks[i].name}','${tasks[i].description}','${tasks[i].date}')`);

        row = document.createElement('tr');
        row.setAttribute('class', 'tasks-data');
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colDate);
        row.appendChild(colStatus);
        row.appendChild(colUpdate);
        row.appendChild(colDelete);

        const table = document.getElementById('tasks')
        table.appendChild(row);

    }
}

function clearTasks(){
    const tasks = document.getElementsByClassName('task-data');
    const arrayTasks = [...tasks];
    arrayTasks.map( task => task.remove() );

}
function fillForm(id, name, description, date){

    const txtid = document.getElementById('id');
    txtid.value = id;

    const txtName = document.getElementById('name');
    txtName.value = name;

    const txtDescription = document.getElementById('description');
    txtDescription.value = description;

    const txtDate = document.getElementById('date');
    txtDate.value = date;
    updateMode = true;
}
function confirmDelete(id, name, description, date){
    const confirmDeleteDialog = document.getElementById('confirmDeleteDialog');
    confirmDeleteDialog.showModal();

    const spanName = document.getElementById('spanName');
    spanName.innerHTML = name;
    const spanDescription = document.getElementById('spanDescription');
    spanDescription.innerHTML = description;
    const spanDate = document.getElementById('spanDate');
    spanDate.innerHTML = date;

    const txtid = document.getElementById('idToDelete');
    txtid.value = id;


}