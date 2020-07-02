package com.jl.sys.util.tag;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import com.jl.common.SpringContext;
import com.jl.sys.service.DepartmentInfoService;


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
	private String datatype;
	private String nullmsg;
	
	public DepartmentInfoService jlDepartmentInfoService=(DepartmentInfoService)SpringContext.getContext().getBean("jlDepartmentInfoService");
	
	
	
	
	
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getHeaderKey() {
		return headerKey;
	}
	public void setHeaderKey(String headerKey) {
		this.headerKey = headerKey;
	}
	public String getHeaderValue() {
		return headerValue;
	}
	public void setHeaderValue(String headerValue) {
		this.headerValue = headerValue;
	}
	public String getReadonly() {
		return readonly;
	}
	public void setReadonly(String readonly) {
		this.readonly = readonly;
	}
	public String getDisabled() {
		return disabled;
	}
	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}
	public String getOnchange() {
		return onchange;
	}
	public void setOnchange(String onchange) {
		this.onchange = onchange;
	}
	public String getCssclass() {
		return cssclass;
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}
	public String getRequired() {
		return required;
	}
	public void setRequired(String required) {
		this.required = required;
	}
	public String getDatatype() {
		return datatype;
	}
	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}
	public String getNullmsg() {
		return nullmsg;
	}
	public void setNullmsg(String nullmsg) {
		this.nullmsg = nullmsg;
	}
	
	
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
            
            List<Map> mlist =jlDepartmentInfoService.findByParentCode("");
            
            for(int m=0;m<mlist.size();m++){
            	mlist.get(m).get("item_name");
            	 option.append("<option value='" + mlist.get(m).get("item_code") + "'");
               if(this.no.equals(mlist.get(m).get("item_code"))) {
                   option.append(" selected");
               }
               option.append(">" + mlist.get(m).get("item_name") + "</option>");
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
            if (null != this.datatype && !"".equals(this.datatype)) {
                buffer.append(" datatype=\"" + this.datatype + "\"");
            }
            if (null != this.nullmsg && !"".equals(this.nullmsg)) {
                buffer.append(" nullmsg=\"" + this.nullmsg + "\"");
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
