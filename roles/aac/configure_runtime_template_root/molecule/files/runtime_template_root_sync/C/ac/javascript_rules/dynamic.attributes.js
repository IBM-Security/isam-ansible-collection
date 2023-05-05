/**
 * This script is executed after each request is processed by risk engine.
 * The intent is to allow users to capture attributes that don't get captured
 * automatically by the system. The attributes captured here will be stored
 * in either the session storage or the behavior storage (i.e., usage data, historical)
 * area of RBA, or both. The risk profile configuration dictates where the 
 * attributes will be stored by the system.
 * 
 * For any RBA specific API, necessary packages need to be imported as shown in this example.
 */


/**
 * Import RBA packages necessary for the script to execute.
 */
importPackage(com.tivoli.am.rba.extensions);
importClass(Packages.com.tivoli.am.rba.attributes.AttributeIdentifier);

/**
 * @param username - current user's name
 * @param attributes - java.util.Map where the 'dynamic' values need to be captured by
 *                     this javascript file.
 * @param session - object containing current values visible to incoming request context
 */
function modifySessionAttributes(attributes, username, session) {
	
	// creates an identifier with the attribute's name, URI, datatype, and the issuer
	var riskScoreIdentifier = new AttributeIdentifier("riskScore", "urn:ibm:security:subject:riskScore",
			                                          "Integer", "urn:ibm:security:issuer:RiskCalculator");
	
	// retrieve the risk score
	var riskScoreValue = session.getValue(riskScoreIdentifier);
	
	// set the risk score to be stored as a session attribute
	attributes.put(riskScoreIdentifier, riskScoreValue);
}

/**
 * @param username - current user's name
 * @param attributes - java.util.Map where the 'dynamic' values need to be captured
 *                     by this javascript file.
 * @param session - RBA's com.tivoli.am.rba.fingerprinting.IValueContainer object
 *                  containing current values visible to incoming request context
 */
function modifyBehaviorAttributes(attributes, username, session) {
  
	// store any behavior attributes here
}
