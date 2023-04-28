<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"; xmlns:stsuuser="urn:ibm:names:ITFIM:1.0:stsuuser" version="1.0">
  <xsl:output method="xml" omit-xml-declaration="yes" encoding='UTF=8' indent="no"/>
  <xsl:template match="text()"></xsl:template>
  <xsl:template match="/XMLUMI/stsuuser:STSUniversalUser/stsuuser:AttributeList">
    <identity><xsl:value-of select="substring-before(stsuuser:Attribute[@name='x509.subject_cn']/stsuuser:Value, '@' )"/></identity>
    <attribute name='tagvalue_userid'><xsl:value-of select="substring-before(stsuuser:Attribute[@name='x509.subject_cn']/stsuuser:Value, '@' )"/></attribute>
  </xsl:template>
</xsl:stylesheet>