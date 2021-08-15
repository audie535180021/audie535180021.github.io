let btnRecord = document.getElementById('btnRecording');

btnRecord.addEventListener("click", (e)=>{
    btnRecord.classList.toggle('start');

    if(e.target.classList.contains('start'))
    {
        btnRecord.innerText = 'Stop Recording';
    }
    else
    {
        btnRecord.innerText = 'Start Recording';
    }
})

