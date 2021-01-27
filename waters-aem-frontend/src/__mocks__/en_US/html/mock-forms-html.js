import {
    mockHeader,
    mockDigitalDataJSON,
	detailTilesChangePasswordJSON,
	checkEmailFormJSON,
	registrationFormJSON,
	registrationFormKrJSON,
	signInFormJSON,
	troubleSigningInFormJSON,
	resetPasswordFormJSON,
} from './mock-html-json';

const mockFormsHTML = mockHeader + `
    <script id="${mockDigitalDataJSON.configId}">
        ${JSON.stringify(mockDigitalDataJSON.html)}
    </script>

    <script id="${detailTilesChangePasswordJSON.configId}">
        ${JSON.stringify(detailTilesChangePasswordJSON.html)}
    </script>

    <script id="${checkEmailFormJSON.configId}">
        ${JSON.stringify(checkEmailFormJSON.html)}
    </script>

    <script id="${registrationFormJSON.configId}">
        ${JSON.stringify(registrationFormJSON.html)}
    </script>

    <script id="${registrationFormKrJSON.configId}">
        ${JSON.stringify(registrationFormKrJSON.html)}
    </script>

    <script id="${signInFormJSON.configId}">
        ${JSON.stringify(signInFormJSON.html)}
    </script>

    <script id="${troubleSigningInFormJSON.configId}">
        ${JSON.stringify(troubleSigningInFormJSON.html)}
    </script>

    <script id="${resetPasswordFormJSON.configId}">
        ${JSON.stringify(resetPasswordFormJSON.html)}
    </script>
`;

export default mockFormsHTML;
