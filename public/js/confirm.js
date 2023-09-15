function OnCognitoConfirmRegistration() {

	var poolData = {
		UserPoolId: 'ap-southeast-2_6s1cA5M6j', // Your user pool id here
		ClientId: '6qsefi57b62s007roqncr9huvo', // Your client id here
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var username = document.getElementById("email").value;
	var code = document.getElementById("ConfirmCode").value;

	var userData = {
		Username: username,
		Pool: userPool,
	};

	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.confirmRegistration(code, true, function(err, result) {
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		console.log('call result: ' + result);
	});
}

