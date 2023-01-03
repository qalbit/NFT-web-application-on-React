import { toast } from 'react-toastify';

export const toast_success = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_warning = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const set_loading = (message) => {
    return toast.loading(message)
}

export const resolve_loading = (id, status, message) => {
    return toast.update(id, { render: message, type:status, isLoading: false, autoClose: 5000,closeButton: true });
}

export const calculate_average = (popularity, originality, community, growth_evaluation, resell_evaluation, potential_blue_chip) => {
    return (
        (parseInt(popularity || 0) + parseInt(originality || 0) + parseInt(community || 0) + parseInt(growth_evaluation || 0) + parseInt(resell_evaluation || 0) + parseInt((potential_blue_chip||0)*10)) 
    / 6).toFixed(2)
}

export const calculate_grade = (score) => {
    if(score >= 90 && score <= 93){
        return 'A-';
    }else if(score >= 94 && score <= 97){
        return 'A';
    }else if(score >= 98 && score <= 100){
        return 'A+';
    }
    else{
        return '-';
    }
}
