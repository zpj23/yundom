package com.jl.sys.util.tag;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;


@SuppressWarnings("serial")
public class DepartmentTag extends TagSupport{
	public String no;
	public String type;
	public String code;
	public String id;
	public String name;
	public String style;
	public String headerKey;
	public String headerValue;
	public String readonly;
	public String disabled;
	public String onchange;
	public String cssclass;
	public String required;
	public String validType;
	
	
	
	
	@Override
	public int doStartTag() throws JspException {
		if (null == this.no) {
            this.no = "";
        }
        if(null == this.required){
        	this.required = "false";
        }
        try {
            /* 插入取得当前SELECTBOX的值 */
            StringBuffer buffer = new StringBuffer();
            StringBuffer option = new StringBuffer();
            if(this.headerValue != null && !this.headerValue.equals("")) {
                option.append("<option value='");
                if(this.headerValue != null && !this.headerValue.equals("")) {
                    option.append(this.headerKey);
                }
                option.append("'>" + this.headerValue + "</option>");
            }
            /* 插入option */
            Map<String,String> codeMap=null ;
//            if (null != this.isarea && !"".equals(this.isarea)) {
//            	if("".equals(typecode)){
//            		typecode =null;
//            	}
//            	codeMap = OrginfoCache.getCodeMapByType(typecode);
//            }else{
//            }
            
            
            
            Set<Entry<String,String>> set = codeMap.entrySet();
            Iterator<Entry<String,String>> iterator = set.iterator();
            Entry<String,String> entry;
            while(iterator.hasNext()) {
                entry = iterator.next();
                option.append("<option value='" + entry.getKey() + "'");
                if(this.no.equals(entry.getKey())) {
                    option.append(" selected");
                }
                option.append(">" + entry.getValue() + "</option>");
            }
            
            /* 插入名称和ID */
            buffer.append("<select name='" + this.name + "'  ");
            buffer.append(" id='" + this.id + "'");

            /* 插入样式 */
            if (null != this.style && !"".equals(this.style)) {
                buffer.append(" style='" + this.style + "'");
            }
            if (null != this.readonly && !"".equals(this.readonly)) {
                buffer.append(" readonly='" + this.readonly + "'");
            }
            if (null != this.disabled && !"".equals(this.disabled)) {
                buffer.append(" disabled='" + this.disabled + "'");
            }
            if (null != this.onchange && !"".equals(onchange)) {
                buffer.append(" onchange=\"" + this.onchange + "\"");
            }
            if (null != this.cssclass && !"".equals(this.cssclass)) {
                buffer.append(" class='" + this.cssclass + "'");
            }
            if (null != this.required && !"".equals(this.required)) {
                buffer.append(" required='" + this.required + "'");
            }
            if (null != this.validType && !"".equals(this.validType)) {
                buffer.append(" validType=\"" + this.validType + "\"");
            }
            
            
            buffer.append(">");
            buffer.append(option);
            buffer.append("</select>");
            /* 插入JSP画面 */
            this.pageContext.getOut().write(buffer.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return EVAL_BODY_INCLUDE;
	}
	@Override
	public int doEndTag() throws JspException {
		return EVAL_PAGE;
	}
}
