function login()
{
	// A new AXAJ request is created
    var xhttp = new XMLHttpRequest();
    // Setting the destination and the method for the request
    xhttp.open("POST", "/doLogin", true);

    // Now we set the callback function that will be triggered
    // due to the server answer receipt
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            // if the login was ok we redirect the user 
            // to the home page
            location.href = '/';
        }
        else if (this.readyState == 4 && this.status == 406) 
        {
        	// otherwise we have to show to the user the error
            var obj = JSON.parse(this.responseText);
            // if the object received contains an error attribute
            // it means that something goes wrong in the server-side
            if(typeof obj.error !== 'undefined')
            {
                // if it is the case we return an error
                var html = errorPanel("Errore: "+ obj.error);
                document.getElementById('loginError').innerHTML = html;
            }
        }
    };

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // sending the request to the server specifing that it contains
    // form inputs data
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&password=" + password);
}

function register()
{
	// A new AXAJ request is created
    var xhttp = new XMLHttpRequest();
    // Setting the destination and the method for the request
    xhttp.open("POST", "/doRegister", true);

    // Now we set the callback function that will be triggered
    // due to the server answer receipt
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            // if the registration was ok we redirect the user 
            // to the login page
            location.href = '/login';
        }
        else if (this.readyState == 4 && this.status == 406) 
        {
        	// otherwise we have to show to the user the error
            var obj = JSON.parse(this.responseText);
            // if the object received contains an error attribute
            // it means that something goes wrong in the server-side
            if(typeof obj.error !== 'undefined')
            {
                // if it is the case we return an error
                var html = errorPanel("Errore: "+ obj.error);
                document.getElementById('registerError').innerHTML = html;
            }
        }
    };

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    var birthday = document.getElementById('birthday').value;
    var phone = document.getElementById('phone').value;

    // sending the request to the server specifing that it contains
    // form inputs data
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username 
    		+ "&" + "password=" + password
    		+ "&" + "repassword=" + repassword
    		+ "&" + "birthday=" + birthday
    		+ "&" + "phone=" + phone);
}

/*
* Function that produces a panel
* to show an error message to the user
* @param text - the error message
* @return the error as bootstrap panel
*/
function errorPanel (text) {
    return '<br/><div class="panel panel-warning">\
                <div class="panel-heading">'
                + text                    
               +'</div>\
            </div>';
}