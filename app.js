const uploadWrapper = document.querySelector('.upload-wrapper');
const uploadedFilesWrapper = document.querySelector('.inputed-files');
const fileSVG= `
<svg class="inputed-file__icon" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.0306 5.71938L11.7806 0.469375C11.7109 0.399749 11.6282 0.344539 11.5371 0.306898C11.4461 0.269257 11.3485 0.249923 11.25 0.25H2.25C1.85218 0.25 1.47064 0.408035 1.18934 0.68934C0.908035 0.970645 0.75 1.35218 0.75 1.75V18.25C0.75 18.6478 0.908035 19.0294 1.18934 19.3107C1.47064 19.592 1.85218 19.75 2.25 19.75H15.75C16.1478 19.75 16.5294 19.592 16.8107 19.3107C17.092 19.0294 17.25 18.6478 17.25 18.25V6.25C17.2501 6.15148 17.2307 6.05391 17.1931 5.96286C17.1555 5.87182 17.1003 5.78908 17.0306 5.71938ZM11.25 6.25V2.125L15.375 6.25H11.25Z" fill="#AC96E4"/>
</svg>`;
const deleteBtnSVG = `
<svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.85375 9.14625C9.90021 9.1927 9.93706 9.24785 9.9622 9.30855C9.98734 9.36925 10.0003 9.4343 10.0003 9.5C10.0003 9.5657 9.98734 9.63075 9.9622 9.69145C9.93706 9.75214 9.90021 9.80729 9.85375 9.85375C9.8073 9.9002 9.75215 9.93705 9.69145 9.96219C9.63075 9.98734 9.5657 10.0003 9.5 10.0003C9.4343 10.0003 9.36925 9.98734 9.30855 9.96219C9.24786 9.93705 9.19271 9.9002 9.14625 9.85375L5 5.70687L0.853753 9.85375C0.759933 9.94757 0.632685 10.0003 0.500003 10.0003C0.367321 10.0003 0.240074 9.94757 0.146253 9.85375C0.052433 9.75993 -0.000274656 9.63268 -0.000274658 9.5C-0.000274661 9.36732 0.052433 9.24007 0.146253 9.14625L4.29313 5L0.146253 0.853749C0.052433 0.759929 -0.000274658 0.632681 -0.000274658 0.499999C-0.000274658 0.367317 0.052433 0.24007 0.146253 0.14625C0.240074 0.0524292 0.367321 -0.000278473 0.500003 -0.000278473C0.632685 -0.000278473 0.759933 0.0524292 0.853753 0.14625L5 4.29312L9.14625 0.14625C9.24007 0.0524292 9.36732 -0.000278476 9.5 -0.000278473C9.63268 -0.00027847 9.75993 0.0524292 9.85375 0.14625C9.94757 0.24007 10.0003 0.367317 10.0003 0.499999C10.0003 0.632681 9.94757 0.759929 9.85375 0.853749L5.70688 5L9.85375 9.14625Z" fill="#794FED"/>
</svg>`;

function toggleDragHighlight(event) {
    event.preventDefault();
    
    if ( uploadWrapper.classList.contains('dragging') ) {
        uploadWrapper.classList.remove('dragging');
        return;
    }

    uploadWrapper.classList.add('dragging');
}

function onDropEvent(event) {
    event.preventDefault();

    const isFile = event.dataTransfer.files.length > 0;

    if ( isFile === false ) return;

    console.log(event.dataTransfer)
    const filesList = [...event.dataTransfer.files];

    filesList.forEach(file => {
        const uploadedFileItemElement = createUploadedFileItemElement({
            name: file.name,
            size: (file.size / 1000000).toFixed(2),
            type: file.type
        });

        uploadedFilesWrapper.innerHTML += uploadedFileItemElement;
        console.log(file.name)
    });
}

function createUploadedFileItemElement(fileData) {
    const fileExtension = fileData.name.match(/\.([9-z])+$/gm)
    const fileName = (
        fileData.name.length > 20
        ? `${fileData.name.slice(0, 20)}...${fileExtension}`
        : fileData.name
    );

    const randomValueAsCurrentlyUploaded = (Math.random() * 2).toFixed(2);

    return `
        <li class="inputed-file">
            <div class="inputed-file__icon-container green">
                ${fileSVG}
            </div>

            <h3 class="inputed-file__file-name">${fileName}</h3>
            <p class="inputed-file__file-bytes">${randomValueAsCurrentlyUploaded}MB / ${fileData.size}MB</p>

            <div class="inputed-file__delete-file">
                ${deleteBtnSVG}
            </div>

            <progress class="inputed-file__progress green" data-percentage="50%"></progress>
    </li>
    `;
}

uploadWrapper.addEventListener('drop', onDropEvent);

uploadedFilesWrapper.addEventListener('click', (e) => {
    console.log(e.target, e.currentTarget)

    const deleteBtn = e.target.closest('.inputed-file__delete-file');
    deleteBtn && deleteBtn.closest('.inputed-file').remove()
});

uploadWrapper.addEventListener('dragenter', toggleDragHighlight);
uploadWrapper.addEventListener('dragover', e => e.preventDefault());
uploadWrapper.addEventListener('dragleave', toggleDragHighlight);
