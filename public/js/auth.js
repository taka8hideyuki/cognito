function OnCognitoAuthenticateUser() {

	var username = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	var authenticationData = {
		Username: username,
		Password: password,
	};

	var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
		authenticationData
	);
	var poolData = {
		UserPoolId: 'ap-southeast-2_6s1cA5M6j', // Your user pool id here
		ClientId: '6qsefi57b62s007roqncr9huvo', // Your client id here
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var userData = {
		Username: username,
		Pool: userPool,
	};

	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: function(result) {
            var idToken = result.getIdToken().getJwtToken();          // IDトークン
			var accessToken = result.getAccessToken().getJwtToken();  // アクセストークン
            var refreshToken = result.getRefreshToken().getToken();   // 更新トークン
            
            console.log("idToken : " + idToken);
            console.log("accessToken : " + accessToken);
            console.log("refreshToken : " + refreshToken);

			//POTENTIAL: Region needs to be set if not already set previously elsewhere.
			AWS.config.region = 'ap-southeast-2';

			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: 'ap-southeast-2:25f746bb-9d2a-4984-a0d8-450ae2c05622', // your identity pool id here
				Logins: {
					// Change the key below according to the specific region your user pool is in.
					'cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_6s1cA5M6j': result
						.getIdToken()
						.getJwtToken(),
				},
			});

			//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
			AWS.config.credentials.refresh(error => {
				if (error) {
					console.error(error);
				} else {
					// Instantiate aws sdk service objects now that the credentials have been updated.
					// example: var s3 = new AWS.S3();
					console.log('Successfully logged!');
				}
			});
		},

		onFailure: function(err) {
			alert(err.message || JSON.stringify(err));
		},
	});
}
