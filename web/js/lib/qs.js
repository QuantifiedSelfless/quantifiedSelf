$(document).ready(function() { 
    $("form[name='user-form'").submit(function (e) {
        var name = $("#user-name").val();
        var email = $("#user-email").val();
        if ($.trim(name).length == 0){
            alert('Please enter your full name');
            e.preventDefault();
        } else if ($.trim(email).length == 0 || !valEmail(email)){
            alert('Please enter a valid email address');
            e.preventDefault();
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://iamadatapoint.com:8085/user/info',
                data: { 
                    'username' : name,
                    'email' : email
                },
                success: function() {
                    window.location('http://iamadatapoint.com:8085/signup#google');
                },
                error: function(xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                }
            });
        }
    });
});


function valEmail(uemail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(uemail)) {
        return true;
    } else {
        return false;
    }
}
