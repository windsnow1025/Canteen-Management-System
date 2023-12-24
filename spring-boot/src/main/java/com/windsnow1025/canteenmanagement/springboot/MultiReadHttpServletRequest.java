package com.windsnow1025.canteenmanagement.springboot;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.io.*;

public class MultiReadHttpServletRequest extends HttpServletRequestWrapper {
    private final byte[] body;

    public MultiReadHttpServletRequest(HttpServletRequest request) throws IOException {
        super(request);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        InputStream inputStream = request.getInputStream();
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) > 0) {
            byteArrayOutputStream.write(buffer, 0, bytesRead);
        }
        body = byteArrayOutputStream.toByteArray();
    }

    @Override
    public BufferedReader getReader() throws IOException {
        String encoding = getCharacterEncoding();
        if (encoding == null) {
            encoding = "UTF-8";
        }
        return new BufferedReader(new InputStreamReader(new ByteArrayInputStream(body), encoding));
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body);

        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
            }

            @Override
            public boolean isFinished() {
                return byteArrayInputStream.available() == 0;
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setReadListener(ReadListener readListener) {
                throw new RuntimeException("Not implemented");
            }
        };
    }
}