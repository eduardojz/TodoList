/*---------------Funciones--------------------*/
function actualizarContador() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let contador = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            contador++;
        }
    });
    document.getElementById('contador').innerText = contador;
}
/*------------------Crear botones----------------*/
function guardar() {
    const container=document.getElementById('contenedorTareas');
    let task = document.getElementById('task');
    if (!verificar(task.value.toLowerCase())==false){
        alert("La tarea ya existe")
        return false;
    }
    createTable(container);
    alertEmpty();
}
function createTable(container){
    const tr = document.createElement('tr');
    const checkTd=document.createElement('td');
    const taskColumn = document.createElement('td');
    const deleteTd=document.createElement('td');
    //
    taskColumn.classList='parrafo'
    taskColumn.textContent=task.value;
    checkTd.appendChild(check())
    deleteTd.appendChild(eliminar())
    //
    task.value='';
    tr.appendChild(checkTd);
    tr.appendChild(taskColumn);
    tr.appendChild(deleteTd);
    //
    let tbody=container.querySelector('tbody');
    let table = container.querySelector('table');
    if (tbody===null && table===null) {
        tbody=document.createElement('tbody')
        table=document.createElement('table')
        table.classList='table'
        tbody.appendChild(tr)
        table.appendChild(tbody)
        container.appendChild(table)
        console.log(table);
    }else{
        tbody.appendChild(tr)
    }
}
function check() {
    const check = document.createElement('input')
    check.type = 'checkbox'
    check.className = 'form-check-input'
    check.addEventListener('click', () => {
        actualizarContador()
    })
    return check;
}
//
function eliminar() {
    const deletebtn = document.createElement('button')
    const img=document.createElement('img')
    img.src="../img/borrar.png";
    img.className="imgDelete";
    deletebtn.appendChild(img);
    deletebtn.className = 'btn-delete';
    
    deletebtn.addEventListener('click', (e) => {
        console.log(e.target.closest('tr'));
        e.target.closest('tr').remove()
        console.log();
        actualizarContador()
        alertEmpty()
    })
    return deletebtn
}
/*Eventos*/
document.querySelector('form').
    addEventListener('submit', e => {
        e.preventDefault()
        guardar()
    })
function verificar(task) {
    const nodes=document.querySelectorAll(".parrafo")
    const condition=(e)=> e.textContent===task;
    return Array.from(nodes).some(condition);
}
document.addEventListener('DOMContentLoaded',alertEmpty)
function alertEmpty(){
    const container=document.getElementById('contenedorTareas');
    const tbody=document.querySelector('tbody');
    if (tbody===null || tbody.childElementCount<=0) { 
        const warning=document.createElement('div'); 
        warning.classList='alert alert-warning';
        warning.role='alert';
        warning.id='alertID';
        warning.textContent='You dont have tasks';
        container.append(warning)
        if (tbody!==null) {            
            tbody.parentNode.remove()
        }
    }
    let divAlert=document.getElementById('alertID')
    
    if(divAlert!==null && tbody!==null && tbody.childElementCount>0){
        divAlert.remove()
    }
}