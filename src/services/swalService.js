import Swal from 'sweetalert2';

export const showLoadingSpinner = () => {
    return Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
}

export const showSuccessMessage = (message) => {
    return Swal.fire('Success!', message, 'success');
}

export const showInfoMessage = (message) => {
    return Swal.fire('Info!', message, 'info');
}

export const showErrorMessage = (message) => {

    return Swal.fire('Error!', message, 'error');

}

