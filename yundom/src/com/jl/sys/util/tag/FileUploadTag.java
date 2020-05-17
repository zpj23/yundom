package com.jl.sys.util.tag;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

/**  
 * @Description: TODO(文件上传)
 * @author ljn  
 * @date 2014-2-25 下午2:31:41
 */
public class FileUploadTag extends TagSupport {
	private String id;
	private String moduleType;
	private String moduleID;
	private String mode;
	
	@Override
	public int doEndTag() throws JspException {
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();  
		StringBuffer buffer = new StringBuffer();
		buffer.append("<script type=\"text/javascript\">baidufile.init('"+mode+"','"+moduleID+"','"+id+"');</script>");
		try {
			this.pageContext.getOut().write(buffer.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
        return EVAL_PAGE;
    }

    @Override
	public int doStartTag() throws JspException {
    	HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();  
        try {
        	StringBuffer buffer = new StringBuffer();
        	
        	buffer.append("<link href=\"ueditor1_4_3-utf8-jsp/themes/default/css/ueditor.css\" rel=\"stylesheet\" type=\"text/css\" />")
			.append("<script src=\"ueditor1_4_3-utf8-jsp/ueditor.config.js\" charset=\"utf-8\" type=\"text/javascript\"></script>")
			.append("<script src=\"ueditor1_4_3-utf8-jsp/ueditor.all.js\" charset=\"utf-8\" type=\"text/javascript\"></script>")
			.append("<script src=\"ueditor1_4_3-utf8-jsp/lang/zh-cn/zh-cn.js\" charset=\"utf-8\" type=\"text/javascript\"></script>")
			.append("<script src=\"ueditor1_4_3-utf8-jsp/lang/en/en.js\"  charset=\"utf-8\"  type=\"text/javascript\"></script>")
			.append("<script src=\"js/comm/file.js\"    type=\"text/javascript\"></script>");
        	
        	buffer.append("<div id=\""+id+"\" style=\"height:0px;width:32px;\"></div>");
        	if(!"view".equals(mode)){
        	buffer.append("<input type=\"hidden\" id=\"fileid\" name=\"fileid\" value=\""+moduleID+"\" />");
        	}
        	
        	if(mode.equals("viewAtt"))
        		buffer.append("<div style=\"background-color: white;width:100%;\" id=\"FileList_"+id+"\" ></div>");
        	else
        		buffer.append("<div id=\"FileList_"+id+"\" ></div>");
        	this.pageContext.getOut().write(buffer.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return EVAL_BODY_INCLUDE;
    }
    
    public String getModuleType() {
		return moduleType;
	}

	public void setModuleType(String moduleType) {
		this.moduleType = moduleType;
	}

	public String getModuleID() {
		return moduleID;
	}

	public void setModuleID(String moduleID) {
		this.moduleID = moduleID;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}
    
	@Override
	public String getId() {
		return id;
	}

	@Override
	public void setId(String id) {
		this.id = id;
	}
}
