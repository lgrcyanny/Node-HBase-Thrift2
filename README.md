Node-HBase-Thrift2
==================

The demo for the node.js, hbse and thrift2

PreCondition
======
Hadoop 2.2.0
HBase 0.96.1
Download HBase src 0.96.1-src.tar.gz, uncompress it
Thrift 0.9.1
MaxOX 10.9

Installation
=====
1. Config Hadoop 2.2.0
Please refer to the blog [Set up Hadoop 2.2 and HBase 0.96 part1](http://www.cyanny.com/2014/02/06/set-hadoop-hbase-part1/)

2. Config HBase 0.96.1
Please refer to the blog [Set up Hadoop 2.2 and HBase 0.96 part2](http://www.cyanny.com/2014/02/06/set-hadoop-hbase-part2/)

3. Install brew, you can google there are many ways

4. brew install thrift
if there is error, please brew update, and reinstall

5. generate thrift files

```sh
  $ thrift --gen js:node path-to-hbasesrc/hbase-0.96.1-src/hbase-thrift/src/main/resources/org/apache/hadoop/hbase/thrift2/Hbase.thrift
  # Then you will get gen-nodejs dir
```
I have retained the gen-nodejs dir, if you have any problems in generating the dir, you can try this one.
Please delete it before you generate a new one.

6.npm install thrift


Run Damos
====
1.start hadoop, hbase, and hbase thrift2
```sh
  $ start-dfs.sh
  $ start-hbase.sh
  $ hbsae thrift2 start -f # Use framed transport， This transport is required when using a non-blocking server. It sends data in frames, where each frame is preceded by length information.
```
2.run get/put/delete/scan
```sh
  $ node thrift-get.js
  $ node thrift-put.js
  $ node thrift-delete.js
  $ node thrift-scan.js
```

Comments
======
Thrift2 by HBase 0.96.1 has no documment, so I have read the code of hbase_types.js and THBaseService.js, and then write the demo following some python and java guide.
BTW, it's not easy to get HBase with node.js done.
Good luck.

References
====
1. [Getting Started with HBase and Thrift for Node](http://dailyjs.com/2013/07/04/hbase/)
2. HBase in Action
3. [building-apache-thrift-on-mac-os-x](http://blog.evernote.com/tech/2012/12/20/building-apache-thrift-on-mac-os-x/)
4. [Thrift API](https://wiki.apache.org/hadoop/Hbase/ThriftApi)



