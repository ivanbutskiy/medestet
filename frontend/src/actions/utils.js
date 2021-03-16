function hideMenu() {
    if (document.getElementById('sidebar').classList.contains('active')) {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('content').classList.remove('active');
    } else {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('content').classList.add('active');
    };
};

export {hideMenu};